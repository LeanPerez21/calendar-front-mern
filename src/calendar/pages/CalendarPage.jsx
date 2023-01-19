import  "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar } from "react-big-calendar";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import CalendarEvent from "../components/CalendarEvent";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNew";
import FabDelete from "../components/FabDelete";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

const CalendarPage = () => {

  const { user } = useAuthStore()
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event,start,end,isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    
    return {
      style
    }
  }  

  const onDoubleClick = (event) => {
    // console.log("Double click", event);
    openDateModal();
  }

  const onSelect = (event) => {
    // console.log("click:", event);
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView',event)
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={lastView}
        style={{ height: 'calc(100vh - 80px)' }}
        messagges={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};

export default CalendarPage;
