import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomeButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export const HomeButton: React.FC<HomeButtonProps> = ({ href, className, children }) => {
    return (
        <div className="flex items-center align-center justify-center min-w-full content-center">
            <div className="w-full max-w-md px-4 justify-end text-right">
                <Link href={href} passHref>
                    <Button className={`rounded bg-gradient-to-r from-[#15323F] to-[#102832] hover:from-[#0a191f] hover:to-[#0e232c] opacity-100 ${className || ''}`}>
                        {children}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
