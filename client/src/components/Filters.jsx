import { Input } from "./ui/input";
import CustomDateInput from "./CustomDateInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Filters({ onFilterChange, onSortChange }) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const handleDateChange = (type, date) => {
    setDateRange(prev => ({
      ...prev,
      [type]: date
    }));
  };

  const handleSortChange = (value) => {
    onSortChange?.(value);
  };

  const handleReset = () => {
    setDateRange({
      startDate: null,
      endDate: null
    });
    onFilterChange?.({ startDate: null, endDate: null });
  };

  const handleApplyFilters = () => {
    onFilterChange?.(dateRange);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <h1 className="font-semibold text-xl">Filters & Sort</h1>
      </div>
      <div className="w-full bg-[#f8f8fb] rounded-md p-4">
        <div className="flex flex-col gap-y-4">
          {/* Filters Row */}
          <div className="flex flex-row items-center gap-x-4">
            {/* Date Range Filter */}
            <div className="flex-1">
              <div className="flex flex-row items-center gap-x-4">
                <div className="flex-1">
                  <CustomDateInput 
                    placeholder="Start date" 
                    value={dateRange.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                  />
                </div>
                <div className="flex-1">
                  <CustomDateInput 
                    placeholder="End date" 
                    value={dateRange.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex flex-1">
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="location-asc">Location (A-Z)</SelectItem>
                  <SelectItem value="location-desc">Location (Z-A)</SelectItem>
                  <SelectItem value="date-asc">Date (Earliest)</SelectItem>
                  <SelectItem value="date-desc">Date (Latest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-row justify-end gap-x-3">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="px-6 cursor-pointer"
            >
              Reset Filters
            </Button>
            <Button 
              onClick={handleApplyFilters}
              className="px-6 cursor-pointer bg-[#3366FF] text-white hover:bg-[#2D5DD7]"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
