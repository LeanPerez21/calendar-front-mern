import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

const FabAddNew = () => {
  const { setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: new addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Leandro",
      },
    });
    openDateModal();
  };

  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default FabAddNew;
