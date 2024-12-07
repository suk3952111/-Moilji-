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
  dropdownClassName?: string[];
  triggerClassName?: string[];
  labelClassName?: string[];
  itemClassName?: string[];
}

export default function CustomDropdown({
  trigger = 'title',
  label = 'menu-label',
  items = ['item1', 'item2', 'item3'],
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
          <DropdownMenuLabel className={`${labelClassName}`}>
            {label}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item, idx) => (
            <DropdownMenuItem key={idx} className={`${itemClassName}`}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
