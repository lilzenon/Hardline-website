#!/bin/bash

# ============================================================================
# BUILD OPTIMIZATION TEST SCRIPT
# ============================================================================
# Tests the optimized Docker build process and measures performance
# Compares standard build vs optimized build times

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing KUTT Homepage Build Optimizations${NC}"
echo -e "${BLUE}=============================================${NC}"

# Function to measure build time
measure_build_time() {
    local build_type=$1
    local start_time=$(date +%s)
    
    echo -e "${YELLOW}⏱️  Starting $build_type build...${NC}"
    
    if [ "$build_type" = "optimized" ]; then
        ./build-optimized.sh test-optimized
    else
        docker build -t kutt-homepage-test-standard .
    fi
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    echo -e "${GREEN}✅ $build_type build completed in ${duration}s${NC}"
    return $duration
}

# Clean up function
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up test images...${NC}"
    docker rmi kutt-homepage-test-standard 2>/dev/null || true
    docker rmi kutt-homepage:test-optimized 2>/dev/null || true
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Trap cleanup on exit
trap cleanup EXIT

# Test 1: Standard build
echo -e "${BLUE}📦 Test 1: Standard Docker Build${NC}"
measure_build_time "standard"
standard_time=$?

echo ""

# Test 2: Optimized build
echo -e "${BLUE}🚀 Test 2: Optimized Docker Build${NC}"
measure_build_time "optimized"
optimized_time=$?

echo ""

# Calculate improvement
if [ $standard_time -gt 0 ]; then
    improvement=$(( (standard_time - optimized_time) * 100 / standard_time ))
    echo -e "${BLUE}📊 Build Performance Results:${NC}"
    echo -e "  Standard Build:  ${standard_time}s"
    echo -e "  Optimized Build: ${optimized_time}s"
    
    if [ $improvement -gt 0 ]; then
        echo -e "  ${GREEN}🎉 Improvement: ${improvement}% faster${NC}"
    else
        echo -e "  ${RED}⚠️  No improvement detected${NC}"
    fi
else
    echo -e "${RED}❌ Could not measure standard build time${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Additional Checks:${NC}"

# Check if BuildKit is available
if docker buildx version >/dev/null 2>&1; then
    echo -e "  ${GREEN}✅ BuildKit available${NC}"
else
    echo -e "  ${YELLOW}⚠️  BuildKit not available${NC}"
fi

# Check cache directory
if [ -d "/tmp/.buildx-cache" ]; then
    cache_size=$(du -sh /tmp/.buildx-cache 2>/dev/null | cut -f1)
    echo -e "  ${GREEN}✅ Build cache exists (${cache_size})${NC}"
else
    echo -e "  ${YELLOW}⚠️  No build cache found${NC}"
fi

# Check image sizes
standard_size=$(docker images kutt-homepage-test-standard --format "{{.Size}}" 2>/dev/null || echo "N/A")
optimized_size=$(docker images kutt-homepage:test-optimized --format "{{.Size}}" 2>/dev/null || echo "N/A")

echo -e "  Standard Image Size:  ${standard_size}"
echo -e "  Optimized Image Size: ${optimized_size}"

echo ""
echo -e "${GREEN}🎉 Build optimization test completed!${NC}"
