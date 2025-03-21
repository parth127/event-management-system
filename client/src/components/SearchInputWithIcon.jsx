import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const SearchInputWithIcon = () => {
  return (
    <div className="flex flex-row justify-start items-center w-[480px] h-10 bg-[#f8f8fb] rounded-md px-2 gap-x-2">
      <div className="">
        <MagnifyingGlassIcon className="w-5 h-5 text-[#9CA3AF]" />
      </div>
      <input
        type="text"
        className="w-full placeholder:text-[#9CA3AF] font-light focus:outline-none"
        placeholder="Search events..."
      />
    </div>
  );
};

export default SearchInputWithIcon;
