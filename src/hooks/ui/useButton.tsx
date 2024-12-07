import { useState } from "react";

interface ButtonGroups {
  onClick: () => Promise<void> | void;
  iniitialLoading?: boolean;
}

export const useButton = ({
  onClick,
  iniitialLoading = false,
}: ButtonGroups) => {
  const [isLoading, setIsLoading] = useState(iniitialLoading);

  const handleClick = async () => {
    if (isLoading) return; // Prevent multiple clicks while loading
    try {
      setIsLoading(true);
      await onClick(); // call the function
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleClick };
};
