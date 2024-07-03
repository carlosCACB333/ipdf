import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { ReactElement, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "../icons";
import { text } from "../primitives";

interface Props {
  children: ReactElement<StepProps>[];
  title: string;
  description: string;
}

export const Wizard = ({ title, description, children }: Props) => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const current = children[active];
  const size = children.length;
  const buttonText = current.props.buttonTitle || "Siguiente";
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className={"mx:max-w-[300px] bg-content1 p-8 rounded-lg shadow-lg"}>
        <Button
          startContent={<ArrowLeft />}
          onClick={() => {
            const isPrev = current.props.onPrev?.();
            if (!isPrev) return;
            setActive((prev) => Math.max(0, prev - 1));
          }}
          isDisabled={active === 0}
        >
          Volver
        </Button>
        <br />
        <br />
        <h1 className={text({ font: "bold", size: "md" })}>{title}</h1>
        <p className={text({ size: "sm" })}>{description}</p>
        <br />
        <ol className="relative ">
          {children.map(({ props }, index) => (
            <li
              key={index}
              className={clsx("pb-10 ps-6", {
                "border-gray-500": index >= active,
                "text-gray-500": index > active,
                "border-s-2": index < size - 1,
              })}
            >
              <span
                className={clsx(
                  "absolute flex items-center justify-center w-8 h-8 bg-content1 rounded-full -start-4 ring-8 ring-content1 border-2",
                  {
                    "border-gray-500": index > active,
                  }
                )}
              >
                {index < active ? <Check className="" /> : index + 1}
              </span>
              <h3 className="font-medium leading-tight">{props.title}</h3>
              <p className="text-sm">{props.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col w-full">
        {current}
        <Button
          color="primary"
          size="lg"
          endContent={<ArrowRight />}
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const isNext = await current.props.onNext?.();
            setIsLoading(false);
            if (!isNext) return;
            setActive((prev) => Math.min(size - 1, prev + 1));
          }}
          className="mt-auto"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

interface StepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  buttonTitle?: string;
  onNext?: () => Promise<boolean> | boolean;
  onPrev?: () => Promise<boolean> | boolean;
}

export const Step = ({ children }: StepProps) => {
  return children;
};
