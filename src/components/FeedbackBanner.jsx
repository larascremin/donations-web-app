function FeedbackBanner({ message, variant = "error" }) {
  if (!message) return null;

  const styles =
    variant === "success"
      ? "bg-green-100 border border-green-400 text-green-800"
      : "bg-red-100 border border-red-400 text-red-800";

  return (
    <div className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-center ${styles}`}>
      {message}
    </div>
  );
}

export default FeedbackBanner;
