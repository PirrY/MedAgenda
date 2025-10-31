// components/molecules/SpecialtyCard.tsx
interface SpecialtyCardProps {
    name: string;
    onClick: () => void;
}

export default function SpecialtyCard({ name, onClick }: SpecialtyCardProps) {
    return (
        <button
            onClick={onClick}
            className="bg-[#94bfe3] text-gray-800 font-semibold text-center py-4 rounded-xl hover:bg-[#8bccc4] transition-colors duration-200 shadow-sm w-full"
        >
            {name}
        </button>
    );
}
