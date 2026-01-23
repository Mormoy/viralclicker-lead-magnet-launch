import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCarouselProps {
  children: React.ReactNode;
  className?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
}

const MobileCarousel = React.forwardRef<HTMLDivElement, MobileCarouselProps>(
  ({ children, className, showIndicators = true, showArrows = false }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);

    React.useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;

      const items = container.children;
      setTotalItems(items.length);

      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.offsetWidth * 0.85;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setActiveIndex(Math.min(newIndex, items.length - 1));
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, [children]);

    const scrollTo = (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const itemWidth = container.offsetWidth * 0.85;
      container.scrollTo({ left: index * itemWidth, behavior: "smooth" });
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        {/* Scrollable container - only visible on mobile */}
        <div
          ref={scrollRef}
          className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              style={{ width: "85%" }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {showArrows && totalItems > 1 && (
          <>
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-1"
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scrollTo(Math.min(totalItems - 1, activeIndex + 1))}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-1"
              disabled={activeIndex === totalItems - 1}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && totalItems > 1 && (
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {Array.from({ length: totalItems }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-viralOrange w-6"
                    : "bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Desktop grid - hidden on mobile, shown on md+ */}
        <div className="hidden md:contents">{children}</div>
      </div>
    );
  }
);

MobileCarousel.displayName = "MobileCarousel";

export { MobileCarousel };
