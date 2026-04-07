import { AlertAction } from './components/AlertAction';
import { AlertDescription } from './components/AlertDescription';
import { AlertRoot } from './components/AlertRoot';
import { AlertTitle } from './components/AlertTitle';
import type { AlertProps } from './types';

const AlertBase = ({
  children,
  title,
  description,
  action,
  icon,
  titleProps,
  descriptionProps,
  actionProps,
  ...rootProps
}: AlertProps) => {
  const hasComposedContent =
    icon !== undefined ||
    title !== undefined ||
    description !== undefined ||
    action !== undefined;

  return (
    <AlertRoot {...rootProps}>
      {children ??
        (hasComposedContent ? (
          <>
            {icon}
            {title !== undefined ? (
              <AlertTitle {...titleProps}>{title}</AlertTitle>
            ) : null}
            {description !== undefined ? (
              <AlertDescription {...descriptionProps}>
                {description}
              </AlertDescription>
            ) : null}
            {action !== undefined ? (
              <AlertAction {...actionProps}>{action}</AlertAction>
            ) : null}
          </>
        ) : null)}
    </AlertRoot>
  );
};

export const Alert = Object.assign(AlertBase, {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
});
