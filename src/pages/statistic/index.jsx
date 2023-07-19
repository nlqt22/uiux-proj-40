import React from "react";
import Card from "@/components/ui/Card";
import Column from "./HorizontalBar";
const StatisticPage = () => {
  return (
    <div className=" space-y-5">
      <Card title="Column Chart">
        <Column />
      </Card>
      
    </div>
  );
};

export default StatisticPage;
