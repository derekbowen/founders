import React from "react";
import { OrderStatus } from "../../types/marketplace";
import { statusLabels } from "../../utils/format";
import { Badge } from "../ui/Badge";

const tones: Record<OrderStatus, "green" | "orange" | "neutral" | "red" | "blue"> = {
  ordered: "orange",
  ready: "green",
  "out-for-delivery": "blue",
  received: "neutral",
  cancelled: "red"
};

export function StatusBadge({ status }: {status: OrderStatus;}) {
  return <Badge tone={tones[status]}>{statusLabels[status]}</Badge>;
}