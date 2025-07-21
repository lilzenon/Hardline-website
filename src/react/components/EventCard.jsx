import React from 'react';

const EventCard = ({ event }) => {
  const formatEventDate = (dateString) => {
    if (!dateString) return 'TBD';
    
    try {
      const date = new Date(dateString);
      const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return 'TBD';
    }
  };

  const handleEventClick = () => {
    if (event.slug) {
      window.location.href = `/event/${event.slug}`;
    }
  };

  return (
    <div 
      className="event-card bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800/50 transition-all duration-200"
      onClick={handleEventClick}
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gray-800">
        {event.cover_image ? (
          <img 
            src={event.cover_image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          {formatEventDate(event.event_date)}
        </div>
      </div>
      
      {/* Event Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {event.title || 'Untitled Event'}
        </h3>
        
        {event.artist_name && (
          <p className="text-gray-300 text-sm mb-2">
            {event.artist_name}
          </p>
        )}
        
        {event.event_address && (
          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
            {event.event_address}
          </p>
        )}
        
        {event.description && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-3">
            {event.description}
          </p>
        )}
        
        {/* CTA Button */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Click to view details
          </span>
          
          {event.tickets_url && (
            <a 
              href={event.tickets_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-3 py-1 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
