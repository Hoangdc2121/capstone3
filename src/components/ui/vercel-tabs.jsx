import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import HeaderNavLabel from "@/layout/header/HeaderNavLabel";

export function VercelTabs({
  tabs,
  activeTab,
  mode = "navigation",
  orientation = "horizontal",
  showUnderline = true,
  onNavigate,
  onValueChange,
  ariaLabel,
  className,
}) {
  const listRef = useRef(null);
  const breadcrumb = mode === "breadcrumb";
  const vertical = !breadcrumb && orientation === "vertical";
  const selection = mode === "selection";
  const Root = selection ? "div" : "nav";

  // Nền chạy theo mục đang hover hoặc focus
  const [highlight, setHighlight] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const showHighlight = (element) => {
    const list = listRef.current;
    if (!list) return;

    setHighlight({
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight,
      opacity: 1,
    });
  };

  const hideHighlight = () => {
    setHighlight((previous) => ({
      ...previous,
      opacity: 0,
    }));
  };

  return (
    <Root
      role={selection ? "group" : undefined}
      aria-label={
        ariaLabel ||
        (breadcrumb
          ? "Đường dẫn trang"
          : selection
            ? "Lọc theo danh mục"
            : vertical
              ? "Menu trên điện thoại"
              : "Điều hướng chính")
      }
      className={className}
    >
      <div
        ref={listRef}
        className={cn(
          "relative isolate flex",
          vertical ? "flex-col gap-2" : "w-max items-center gap-1",
        )}
        onMouseLeave={hideHighlight}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            hideHighlight();
          }
        }}
      >
        {/* Nền hover dùng chung */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 rounded-xl bg-accent transition-all duration-300 ease-out"
          style={highlight}
        />

        {tabs.map((tab, index) => {
          const active = activeTab === tab.value;
          const current = breadcrumb && index === tabs.length - 1;
          const Icon = tab.icon;
          const EndIcon = tab.endIcon;
          const hasAction = tab.action != null;

          const Wrapper = current
            ? "span"
            : hasAction
              ? "div"
              : selection
                ? "button"
                : Link;

          const wrapperProps = current
            ? {
                "aria-current": "page",
              }
            : hasAction
              ? {}
              : selection
                ? {
                    type: "button",
                    "aria-pressed": active,
                    onClick: () => {
                      onValueChange?.(tab.value);
                    },
                  }
                : {
                    to: tab.to,
                    "aria-current": active ? "page" : undefined,
                    onClick: () => {
                      tab.onClick?.();
                      hideHighlight();
                      onNavigate?.();
                    },
                  };

          return (
            <Fragment key={tab.value}>
              {/* Dấu phân cách chỉ dùng cho breadcrumb */}
              {breadcrumb && index > 0 && (
                <span
                  aria-hidden="true"
                  className="shrink-0 text-sm text-muted-foreground"
                >
                  /
                </span>
              )}

              <Wrapper
                {...wrapperProps}
                onMouseEnter={(event) => {
                  if (current) {
                    hideHighlight();
                    return;
                  }

                  showHighlight(event.currentTarget);
                }}
                onFocus={(event) => {
                  if (!current) {
                    showHighlight(event.currentTarget);
                  }
                }}
                className={cn(
                  "group relative z-10 flex items-center gap-3 rounded-xl",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",

                  breadcrumb
                    ? "shrink-0 whitespace-nowrap px-2 py-2"
                    : vertical
                      ? "border border-border p-3"
                      : "shrink-0 justify-center whitespace-nowrap px-3",

                  // Viền cho các nút lọc danh mục
                  selection &&
                    (active
                      ? "border border-primary"
                      : "border border-border hover:border-primary"),

                  !hasAction && !current && "cursor-pointer",

                  current
                    ? "text-foreground!"
                    : active
                      ? "text-primary!"
                      : "text-muted-foreground! hover:text-primary!",
                )}
              >
                {Icon && (
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.7}
                    />
                  </span>
                )}

                {breadcrumb ? (
                  <span className="font-sans text-sm">{tab.label}</span>
                ) : (
                  <HeaderNavLabel
                    active={active}
                    showDot={tab.showDot ?? true}
                    showUnderline={showUnderline}
                    className={vertical ? "min-w-0 flex-1" : undefined}
                  >
                    {tab.label}
                  </HeaderNavLabel>
                )}

                {hasAction ? (
                  <div className="shrink-0">{tab.action}</div>
                ) : (
                  EndIcon && (
                    <EndIcon aria-hidden="true" className="size-3.5 shrink-0" />
                  )
                )}
              </Wrapper>
            </Fragment>
          );
        })}
      </div>
    </Root>
  );
}
