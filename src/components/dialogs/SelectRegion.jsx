'use client';

import { MapPin } from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import Cookies from 'js-cookie';

export default function SelectRegion({
  open,
  setOpen,
  setSelectedRegion,
  selectedRegion,
  regions,
}) {
  const onChange = (value) => {
    if (Cookies.get('region') != value) {
      setSelectedRegion(value);
      Cookies.set('region', value);
      window.location.reload();
    }
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder='Hududni tanlang...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Hududlar'>
            <CommandItem
              className={`${!selectedRegion ? 'bg-gray-100' : ''}`}
              onSelect={() => onChange('')}
            >
              <MapPin />
              <span>Hammasi</span>
            </CommandItem>
            {regions?.data?.map((region) => (
              <CommandItem
                className={`${selectedRegion == region?.id ? 'bg-gray-100' : ''}`}
                value={region?.id}
                onSelect={() => onChange(region?.id)}
                key={region?.id}
              >
                <MapPin />
                <span>{region?.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
