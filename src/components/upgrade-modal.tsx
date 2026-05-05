"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialogDescription , AlertDialogTitle , AlertDialogHeader, AlertDialogContent, AlertDialog, AlertDialogFooter, AlertDialogCancel, AlertDialogAction} from "./ui/alert-dialog";

interface UpgardeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({
    open, onOpenChange
}: UpgardeModalProps) => {
    return(
        <AlertDialog>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subsciption to perform this action. Upgrade to Pro to unlock all features.
                    </AlertDialogDescription>
                </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                onClick={() => authClient.checkout({ slug: "pro"})}
                >
                    Upgarde Now
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}