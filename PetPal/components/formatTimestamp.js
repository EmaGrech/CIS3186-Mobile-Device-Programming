const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    
    let formattedDate;
    
    if (isToday(date)) {
      formattedDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      formattedDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
                      ', ' + date.toLocaleDateString([], { day: '2-digit', month: 'short' });
    }
    return formattedDate;
  };
  
export {formatTimestamp}