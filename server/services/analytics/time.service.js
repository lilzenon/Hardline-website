// Time and delta utilities for analytics

function getDateRanges(period = 'month') {
  const now = new Date();
  const endCurrent = now;
  let startCurrent;
  let startPrevious;
  let endPrevious;

  const msInDay = 24 * 60 * 60 * 1000;

  switch (period) {
    case 'today': {
      startCurrent = new Date(now.getTime() - msInDay);
      endPrevious = startCurrent;
      startPrevious = new Date(endPrevious.getTime() - msInDay);
      break;
    }
    case 'week': {
      startCurrent = new Date(now.getTime() - 7 * msInDay);
      endPrevious = startCurrent;
      startPrevious = new Date(endPrevious.getTime() - 7 * msInDay);
      break;
    }
    case 'year': {
      const y = now.getUTCFullYear();
      startCurrent = new Date(Date.UTC(y, 0, 1, 0, 0, 0));
      const prevY = y - 1;
      startPrevious = new Date(Date.UTC(prevY, 0, 1, 0, 0, 0));
      endPrevious = new Date(
        Date.UTC(
          prevY,
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );
      break;
    }
    case 'month':
    default: {
      startCurrent = new Date(now.getTime() - 30 * msInDay);
      endPrevious = startCurrent;
      startPrevious = new Date(endPrevious.getTime() - 30 * msInDay);
      break;
    }
  }

  return {
    current: { start: startCurrent, end: endCurrent },
    previous: { start: startPrevious, end: endPrevious ?? startPrevious },
  };
}

function percentChangeOrNA(current, previous) {
  const c = Number(current) || 0;
  const p = Number(previous) || 0;
  if (p === 0) return 'N/A';
  const pct = ((c - p) / p) * 100;
  return Number.isFinite(pct) ? pct : 'N/A';
}

module.exports = {
  getDateRanges,
  percentChangeOrNA,
};

