export const SVG = (props) => {
  const {
    svg,
    hoverColor,
    isOnlyLayout,
    transition,
    trigger,
    defaultColor,
    alt,
    hoverBackgroundColor,
  } = props;

  const [newSVG, setNewSVG] = useState(
    isOnlyLayout ? ReColorSvg(svg, `${hoverColor}`, `${defaultColor}`) : svg
  );

  const MouseSVGTrigger = (type) => {
    setNewSVG(
      type === "enter"
        ? ReColorSvg(svg, `${hoverColor}`, `${defaultColor}`)
        : ReColorSvg(svg, `${defaultColor}`, `${hoverColor}`)
    );
    if (trigger && trigger.current) {
      trigger.current.style.backgroundColor =
        type === "enter" ? `${hoverBackgroundColor}` : `${defaultColor}`;
      trigger.current.style.transition = `${transition}`;
    }
  };

  useEffect(() => {
    const ref_node = trigger?.current;

    const RunMouseEnter = () =>
      ref_node?.addEventListener("mouseenter", () => MouseSVGTrigger("enter"));
    const RunMouseLeave = () =>
      ref_node?.addEventListener("mouseleave", () => MouseSVGTrigger("leave"));

    if (trigger) {
      RunMouseEnter();
      RunMouseLeave();
    }

    return () => {
      if (trigger) {
        ref_node?.removeEventListener("mouseenter", () => RunMouseEnter());
        ref_node?.removeEventListener("mouseleave", () => RunMouseLeave());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // don't add any mouse events for improving perfomance
  if (isOnlyLayout) {
    return <img src={`data:image/svg+xml;utf8,${newSVG}`} alt={alt} />;
  }

  return (
    <img
      src={`data:image/svg+xml;utf8,${newSVG}`}
      onMouseEnter={() =>
        typeof trigger !== "undefined" ? null : MouseSVGTrigger("enter")
      }
      onMouseLeave={() =>
        typeof trigger !== "undefined" ? null : MouseSVGTrigger("leave")
      }
      alt={alt}
    />
  );
};
