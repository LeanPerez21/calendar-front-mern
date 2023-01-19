import { useCalendarStore } from "../../hooks/useCalendarStore";

const FabDelete = () => {
  const { StartDeletingEvent, hasEventSelected, activeEvent } = useCalendarStore();

  const handleClickDelete = () => {
    StartDeletingEvent(activeEvent);
  }

  return (
    <button style={{display: hasEventSelected ? '' : 'none'}} disabled={!hasEventSelected} onClick={handleClickDelete} className="btn btn-danger fab-danger">
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

export default FabDelete;
