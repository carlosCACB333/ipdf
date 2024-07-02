import { text } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1
        className={text({
          size: "xl",
          color: "blue",
        })}
      >
        About
      </h1>
    </div>
  );
}
