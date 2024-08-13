import { StarIcon } from "@heroicons/react/20/solid";

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 flex-shrink-0 ${
            rating > star ? "text-yellow-400" : "text-gray-200"
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">{rating}</span>
    </div>
  );
};

export default Stars;
