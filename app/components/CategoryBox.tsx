import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  description?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  //important
  // The code sets up a function handleClick that manipulates the query parameters in the URL.
  // It parses the current search parameters, updates the category parameter based on the value of label, and conditionally removes it if it matches the existing value.
  // Finally, it constructs a new URL with the updated query parameters.

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    gap-2 
                    p-3 
                    border-b-2 
                    hover:text-neutral-800 
                    transition 
                    cursor-pointer 
                    ${selected ? "border-b-neutral-800" : "border-transparent"}
                    ${selected ? "text-neutral-800" : "text-neutral-500"}
                `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
