import { Button } from "./Button";
import { Card, CardBody } from "./Card";

export function RiskColumn({ title, count, color, risks, onViewDetails }: any) {
  const colorClasses: any = {
    red: "bg-red-50 text-red-800",
    yellow: "bg-yellow-50 text-yellow-800",
    green: "bg-green-50 text-green-800"
  };

  return (
    <div className={`rounded-xl border ${color}-200 p-4 space-y-4`}>
      <h2 className={`font-semibold text-lg ${color}-700`}>{title} ({count})</h2>
      {risks.length === 0 ? (
        <p className="text-sm text-gray-500">No risks</p>
      ) : (
        risks.map((risk: any) => (
          <Card key={risk._id} className="shadow-sm border">
            <CardBody className="p-4 space-y-2">
              <p className="font-semibold">{risk.title}</p>
              <p className="text-xs text-gray-500">Project: {risk.projectName}</p>
              <Button
                size="sm"
                className={`bg-${color}-600 hover:bg-${color}-700 text-white`}
                onClick={() => onViewDetails(risk)}
              >
                View Details
              </Button>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
