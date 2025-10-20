import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const Card = ({ className, children }) => (
  <div
    className={cn(
      "rounded-lg border border-border-default bg-surface-default text-text-default shadow-sm flex flex-col justify-start",
      className
    )}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardHeader = ({ className, children }) => (
  <div className={cn("p-6 flex flex-col space-y-1.5", className)}>
    {children}
  </div>
);
CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardTitle = ({ className, children }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);
CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardDescription = ({ className, children }) => (
  <p className={cn("text-sm text-text-muted", className)}>{children}</p>
);
CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardContent = ({ className, children }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);
CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardFooter = ({ className, children }) => (
  <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>
);
CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;