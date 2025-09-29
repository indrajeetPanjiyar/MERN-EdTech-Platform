export const formattedDate = (date) => {
    if(!date) return "Add Date Of Birth";
    const parsed = new Date(date);
    if (isNaN(parsed)) return "Invalid Date";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }