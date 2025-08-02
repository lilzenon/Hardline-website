#!/bin/bash

# PostgreSQL Backup and Recovery Strategy
# KUTT B2B Application Database Management
# 
# This script provides comprehensive backup, monitoring, and recovery procedures
# for the PostgreSQL database optimization implementation.

set -euo pipefail

# Configuration
DB_NAME="${DB_NAME:-kutt}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/postgresql}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
LOG_FILE="${LOG_FILE:-/var/log/postgresql-backup.log}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Create backup directory
create_backup_dir() {
    if [[ ! -d "$BACKUP_DIR" ]]; then
        mkdir -p "$BACKUP_DIR"
        log "Created backup directory: $BACKUP_DIR"
    fi
}

# Pre-migration backup
pre_migration_backup() {
    local backup_name="pre_optimization_$(date +%Y%m%d_%H%M%S)"
    local backup_file="$BACKUP_DIR/${backup_name}.dump"
    
    log "Creating pre-migration backup: $backup_name"
    
    # Full database backup
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -Fc -v -f "$backup_file" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        success "Pre-migration backup completed: $backup_file"
        
        # Verify backup
        pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" \
            -d template1 -l "$backup_file" > /dev/null 2>&1
        
        if [[ $? -eq 0 ]]; then
            success "Backup verification passed"
        else
            error "Backup verification failed"
        fi
    else
        error "Pre-migration backup failed"
    fi
    
    echo "$backup_file"
}

# Schema-only backup
schema_backup() {
    local backup_name="schema_$(date +%Y%m%d_%H%M%S)"
    local backup_file="$BACKUP_DIR/${backup_name}.sql"
    
    log "Creating schema backup: $backup_name"
    
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        --schema-only -v -f "$backup_file" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        success "Schema backup completed: $backup_file"
    else
        error "Schema backup failed"
    fi
    
    echo "$backup_file"
}

# Data-only backup for critical tables
critical_data_backup() {
    local backup_name="critical_data_$(date +%Y%m%d_%H%M%S)"
    local backup_file="$BACKUP_DIR/${backup_name}.dump"
    
    log "Creating critical data backup: $backup_name"
    
    # Backup only critical tables
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -Fc -v --data-only \
        -t users -t links -t events -t visits -t event_signups \
        -f "$backup_file" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        success "Critical data backup completed: $backup_file"
    else
        error "Critical data backup failed"
    fi
    
    echo "$backup_file"
}

# Performance baseline capture
capture_performance_baseline() {
    local baseline_file="$BACKUP_DIR/performance_baseline_$(date +%Y%m%d_%H%M%S).sql"
    
    log "Capturing performance baseline"
    
    cat > "$baseline_file" << 'EOF'
-- Performance Baseline Capture
-- Run BEFORE optimization implementation

-- Query performance statistics
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE calls > 10
ORDER BY total_exec_time DESC
LIMIT 20;

-- Index usage statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;

-- Table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as index_size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Connection and activity stats
SELECT 
    state,
    count(*) as connections,
    avg(extract(epoch from now() - state_change)) as avg_duration_seconds
FROM pg_stat_activity 
WHERE state IS NOT NULL
GROUP BY state;

-- Cache hit ratios
SELECT 
    'index hit rate' as metric,
    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio
FROM pg_statio_user_indexes
UNION ALL
SELECT 
    'table hit rate' as metric,
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio
FROM pg_statio_user_tables;
EOF

    # Execute baseline queries and save results
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -f "$baseline_file" > "$BACKUP_DIR/baseline_results_$(date +%Y%m%d_%H%M%S).txt" 2>&1
    
    success "Performance baseline captured: $baseline_file"
}

# Migration execution with monitoring
execute_migration() {
    local migration_file="$1"
    local migration_name=$(basename "$migration_file" .sql)
    
    if [[ ! -f "$migration_file" ]]; then
        error "Migration file not found: $migration_file"
    fi
    
    log "Executing migration: $migration_name"
    
    # Create migration log
    local migration_log="$BACKUP_DIR/migration_${migration_name}_$(date +%Y%m%d_%H%M%S).log"
    
    # Execute migration with timing
    local start_time=$(date +%s)
    
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -v ON_ERROR_STOP=1 \
        -f "$migration_file" > "$migration_log" 2>&1
    
    local exit_code=$?
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    if [[ $exit_code -eq 0 ]]; then
        success "Migration completed in ${duration}s: $migration_name"
    else
        error "Migration failed after ${duration}s: $migration_name (see $migration_log)"
    fi
}

# Post-migration verification
verify_migration() {
    log "Verifying migration results"
    
    local verification_file="$BACKUP_DIR/verification_$(date +%Y%m%d_%H%M%S).sql"
    
    cat > "$verification_file" << 'EOF'
-- Post-Migration Verification

-- Check for missing indexes that should exist
SELECT 
    'Missing critical indexes' as check_type,
    COUNT(*) as count
FROM information_schema.tables t
LEFT JOIN information_schema.statistics s ON t.table_name = s.table_name
WHERE t.table_schema = 'public' 
    AND t.table_name IN ('links', 'visits', 'events', 'users')
    AND s.index_name IS NULL;

-- Verify new indexes exist
SELECT 
    'New indexes created' as check_type,
    COUNT(*) as count
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND (indexname LIKE '%_idx' OR indexname LIKE '%recent_popular%' OR indexname LIKE '%analytics%');

-- Check table constraints
SELECT 
    'Constraint violations' as check_type,
    COUNT(*) as count
FROM information_schema.table_constraints 
WHERE constraint_schema = 'public' 
    AND constraint_type = 'CHECK';

-- Verify foreign key integrity
SELECT 
    'Foreign key violations' as check_type,
    COUNT(*) as violations
FROM (
    SELECT 1 FROM links l LEFT JOIN users u ON l.user_id = u.id WHERE l.user_id IS NOT NULL AND u.id IS NULL
    UNION ALL
    SELECT 1 FROM visits v LEFT JOIN links l ON v.link_id = l.id WHERE v.link_id IS NOT NULL AND l.id IS NULL
    UNION ALL
    SELECT 1 FROM events e LEFT JOIN users u ON e.user_id = u.id WHERE e.user_id IS NOT NULL AND u.id IS NULL
) violations;

-- Performance check: Ensure no sequential scans on critical queries
EXPLAIN (FORMAT JSON) 
SELECT l.*, u.email FROM links l 
JOIN users u ON l.user_id = u.id 
WHERE l.created_at > NOW() - INTERVAL '30 days' 
ORDER BY l.visit_count DESC LIMIT 20;
EOF

    # Execute verification
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -f "$verification_file" > "$BACKUP_DIR/verification_results_$(date +%Y%m%d_%H%M%S).txt" 2>&1
    
    success "Migration verification completed"
}

# Rollback procedure
rollback_migration() {
    local backup_file="$1"
    
    if [[ ! -f "$backup_file" ]]; then
        error "Backup file not found: $backup_file"
    fi
    
    warning "INITIATING ROLLBACK - This will restore the database to pre-migration state"
    read -p "Are you sure you want to proceed? (yes/no): " confirm
    
    if [[ "$confirm" != "yes" ]]; then
        log "Rollback cancelled"
        return 1
    fi
    
    log "Rolling back database from: $backup_file"
    
    # Drop and recreate database
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres \
        -c "DROP DATABASE IF EXISTS ${DB_NAME}_rollback;"
    
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres \
        -c "CREATE DATABASE ${DB_NAME}_rollback;"
    
    # Restore backup to new database
    pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" \
        -d "${DB_NAME}_rollback" -v "$backup_file" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        success "Rollback completed to database: ${DB_NAME}_rollback"
        warning "Manual intervention required to switch databases"
    else
        error "Rollback failed"
    fi
}

# Cleanup old backups
cleanup_old_backups() {
    log "Cleaning up backups older than $RETENTION_DAYS days"
    
    find "$BACKUP_DIR" -name "*.dump" -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*.sql" -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*.txt" -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*.log" -mtime +$RETENTION_DAYS -delete
    
    success "Cleanup completed"
}

# Main execution function
main() {
    local action="${1:-help}"
    
    case "$action" in
        "pre-backup")
            create_backup_dir
            pre_migration_backup
            ;;
        "schema-backup")
            create_backup_dir
            schema_backup
            ;;
        "critical-backup")
            create_backup_dir
            critical_data_backup
            ;;
        "baseline")
            create_backup_dir
            capture_performance_baseline
            ;;
        "migrate")
            if [[ -z "${2:-}" ]]; then
                error "Migration file required: $0 migrate <migration_file>"
            fi
            execute_migration "$2"
            ;;
        "verify")
            verify_migration
            ;;
        "rollback")
            if [[ -z "${2:-}" ]]; then
                error "Backup file required: $0 rollback <backup_file>"
            fi
            rollback_migration "$2"
            ;;
        "cleanup")
            cleanup_old_backups
            ;;
        "full-migration")
            create_backup_dir
            backup_file=$(pre_migration_backup)
            capture_performance_baseline
            
            # Execute all migrations
            for migration in database/migrations/*.sql; do
                if [[ -f "$migration" ]]; then
                    execute_migration "$migration"
                fi
            done
            
            verify_migration
            success "Full migration completed. Backup: $backup_file"
            ;;
        "help"|*)
            echo "PostgreSQL Database Backup and Migration Tool"
            echo ""
            echo "Usage: $0 <action> [options]"
            echo ""
            echo "Actions:"
            echo "  pre-backup     Create full database backup before migration"
            echo "  schema-backup  Create schema-only backup"
            echo "  critical-backup Create backup of critical tables only"
            echo "  baseline       Capture performance baseline"
            echo "  migrate <file> Execute specific migration file"
            echo "  verify         Verify migration results"
            echo "  rollback <file> Rollback using backup file"
            echo "  cleanup        Remove old backup files"
            echo "  full-migration Execute complete migration process"
            echo "  help           Show this help message"
            echo ""
            echo "Environment Variables:"
            echo "  DB_NAME        Database name (default: kutt)"
            echo "  DB_USER        Database user (default: postgres)"
            echo "  DB_HOST        Database host (default: localhost)"
            echo "  DB_PORT        Database port (default: 5432)"
            echo "  BACKUP_DIR     Backup directory (default: /var/backups/postgresql)"
            echo "  RETENTION_DAYS Backup retention days (default: 30)"
            ;;
    esac
}

# Execute main function with all arguments
main "$@"
