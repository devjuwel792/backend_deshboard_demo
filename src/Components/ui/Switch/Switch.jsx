export function Switch() {
    return (
        <label htmlFor="switch" className="inline-flex items-center cursor-pointer">
            <input id="switch" type="checkbox" defaultChecked className="sr-only peer" />
            <div
                className="relative w-11 h-6 rounded-full bg-gray-200 dark:bg-[#303038] peer-checked:bg-primary dark:peer-checked:bg-primary
                     after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary peer-checked:after:bg-white
                     after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
            />
        </label>
    );
}