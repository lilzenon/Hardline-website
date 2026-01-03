import { Loader2Icon, Check, X } from "lucide-react";
import { cn } from "../../../lib/utils";

interface SpinnerProps extends React.ComponentProps<"svg"> {
    state?: "loading" | "success" | "error";
}

function Spinner({ className, state = "loading", ...props }: SpinnerProps) {
    if (state === "success") {
        return (
            <Check
                className={cn("size-6 animate-in zoom-in spin-in-180 fade-in duration-300 text-emerald-500", className)}
                {...props}
            />
        );
    }

    if (state === "error") {
        return (
            <X
                className={cn("size-6 animate-in zoom-in spin-in-180 fade-in duration-300 text-red-500", className)}
                {...props}
            />
        );
    }

    return (
        <Loader2Icon
            role="status"
            aria-label="Loading"
            className={cn("size-6 animate-spin text-zinc-400", className)}
            {...props}
        />
    );
}

export { Spinner };
