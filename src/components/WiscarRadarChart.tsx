import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface WiscarData {
  subject: string;
  score: number;
  fullMark: number;
}

interface WiscarRadarChartProps {
  data: WiscarData[];
}

const WiscarRadarChart = ({ data }: WiscarRadarChartProps) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis 
            dataKey="subject" 
            className="text-xs fill-muted-foreground"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            className="text-xs fill-muted-foreground"
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WiscarRadarChart;