import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import type { CategoryStatEntity } from '../../domain/entities/category-stats.entity';

interface Props {
  stats: CategoryStatEntity[];
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: CategoryStatEntity;
  percent: number;
  value: number;
}

function ActiveShape(props: ActiveShapeProps) {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" className="fill-foreground text-sm font-medium">
        {payload.category.icon} {payload.category.name}
      </text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" className="fill-muted-foreground text-xs">
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="fill-foreground text-xs"
      >
        {value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
      </text>
    </g>
  );
}

export default function CategoryPieChart({ stats }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const data = stats.map((stat) => ({
    ...stat,
    name: stat.category.name,
    value: stat.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props: unknown) => <ActiveShape {...(props as ActiveShapeProps)} />}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(undefined)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.category.color}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
          }
          labelFormatter={(label: string) => label}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
