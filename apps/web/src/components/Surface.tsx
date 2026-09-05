import {
  createElement,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

export type SurfaceTone = "default" | "subtle" | "raised";
export type SurfacePadding = "none" | "sm" | "md" | "lg";

type SurfaceOwnProps<TElement extends ElementType> = {
  readonly as?: TElement;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly padding?: SurfacePadding;
  readonly tone?: SurfaceTone;
};

export type SurfaceProps<TElement extends ElementType = "div"> =
  SurfaceOwnProps<TElement> &
    Omit<ComponentPropsWithoutRef<TElement>, keyof SurfaceOwnProps<TElement>>;

function SurfaceComponent<TElement extends ElementType = "div">(
  {
    as,
    className,
    padding = "md",
    tone = "default",
    ...props
  }: SurfaceProps<TElement>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const element = as ?? "div";
  const classes = [
    "ax-surface",
    `ax-surface--${tone}`,
    `ax-surface--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(element, { ...props, className: classes, ref });
}

export const Surface = forwardRef(SurfaceComponent) as <
  TElement extends ElementType = "div",
>(
  props: SurfaceProps<TElement> & { readonly ref?: React.Ref<HTMLElement> },
) => React.ReactElement | null;
