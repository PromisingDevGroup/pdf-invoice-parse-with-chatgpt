import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"

interface ExampleProps {
    open: boolean;
    message: string;
}
export default function AlertComponent({ open: initialOpen, message }: ExampleProps) {
    const [open, setOpen] = useState(initialOpen);
    useEffect(() => {
        setOpen(initialOpen)
    }, [initialOpen])
    return (
        <Alert
            icon={
                <InformationCircleIcon
                    strokeWidth={2}
                    className="h-6 w-6"
                />
            }
            open={open} animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
            }}
            onClose={() => setOpen(false)}
            className="w-[250] fixed top-5 right-5 z-[2000]"
        >
            {message}
        </Alert>
    );
}