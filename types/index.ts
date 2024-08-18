import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Status = "SUCCESS" | "FAILED";

export interface Res<T extends Record<string, any> = Record<string, any>> {
  status: Status;
  message: string;
  data?: T;
}
