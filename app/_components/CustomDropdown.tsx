import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface customDropdownProps {
  trigger?: string;
  label?: string;
  items?: string[];
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
  dropdownClassName?: string[];
  triggerClassName?: string[];
  labelClassName?: string[];
  itemClassName?: string[];
}

export default function CustomDropdown({
  trigger = 'title',
  label,
  items = ['item1', 'item2', 'item3'],
  children,
  onSelect,
  dropdownClassName,
  triggerClassName,
  labelClassName,
  itemClassName,
}: customDropdownProps) {
  return (
    <div className={`${dropdownClassName}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className={`${triggerClassName}`}>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {label && (
            <DropdownMenuLabel className={`${labelClassName}`}>
              {label}
            </DropdownMenuLabel>
          )}
          <DropdownMenuSeparator />
          {children
            ? children
            : items.map((item, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className={`${itemClassName?.join(' ')}`}
                  onClick={() => onSelect && onSelect(item)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
