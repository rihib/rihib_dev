// Re-export component prop interfaces from focused modules for backward compatibility
// This approach maintains existing imports while organizing components by category

// Form and input components
export type {
  ButtonProps,
  InputProps,
  TextareaProps,
  SelectProps,
  SelectOption,
  SearchProps,
  FilterProps,
  FilterOption,
} from './components/form-components';

// Layout and navigation components
export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  LayoutProps,
  SectionProps,
  ContainerProps,
  NavLinkProps,
  BreadcrumbProps,
  BreadcrumbItem,
  ModalProps,
  OverlayProps,
  PopoverProps,
} from './components/layout-components';

// Feedback and notification components
export type {
  AlertProps,
  ToastProps,
  ToastAction,
  LoadingProps,
  SkeletonProps,
  ErrorBoundaryProps,
  ComponentErrorBoundaryFallbackProps,
  ErrorDisplayProps,
} from './components/feedback-components';

// Data display and presentation components
export type {
  ArticleListProps,
  ArticleCardProps,
  TimelineProps,
  TimelineItemProps,
  ProfileSectionProps,
  ProfileHeaderProps,
  ExternalLinkCardProps,
  ExternalLinkGridProps,
  TableProps,
  TableColumn,
  IconProps,
  IconButtonProps,
} from './components/data-components';

// Utility and generic components
export type {
  ThemeToggleProps,
  LanguageToggleProps,
  ColorSchemeToggleProps,
  AnimatedProps,
  TransitionProps,
  ConditionalWrapperProps,
  LazyLoadProps,
  ForwardRefComponent,
  ComponentWithRef,
  PolymorphicComponentProp,
  PolymorphicComponentPropsWithRef,
  CompositeComponentProps,
  EventHandlerProps,
} from './components/utility-components';
