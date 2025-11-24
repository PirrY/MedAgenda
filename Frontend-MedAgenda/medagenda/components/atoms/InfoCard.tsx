interface InfoCardProps {
    title: string;
    text: string;
}

export default function InfoCard({ title, text }: InfoCardProps) {
    return (
        <div className="p-6 bg-white border-2 border-blue-300 text-[#4682B4] rounded-lg shadow-lg text-center">
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <p className="text-black/90">{text}</p>
        </div>
    );
}
