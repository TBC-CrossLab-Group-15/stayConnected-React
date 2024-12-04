import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Loading...</h2>
      <Progress value={progress} className="mb-4" />
      {progress === 100 && <p className="text-green-500">Complete!</p>}
    </div>
  );
};

export default Loader;
