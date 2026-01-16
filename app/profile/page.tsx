"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Home
    </Link>
  );
}

export default function ProfilePage({ user }: { user: any }) {
  // Popup meddelande
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Kontroll för dialogen
  const [open, setOpen] = useState(false);

  // Hämta namn och första bokstaven
  const name =
    user?.formData?.find(
      (f: any): f is { marker: "name"; value: string } => f.marker === "name"
    )?.value ?? "Unknown";

  const initials = name.charAt(0)?.toUpperCase() ?? "?";

  const email = user?.identifier ?? "No email";

  // DELETE = bara logga ut
  async function deleteAccount() {
    try {
      const res = await fetch("/api/delete-account", { method: "DELETE" });
      const data = await res.json();

      if (!data.success) throw new Error("Logout failed");

      // Visa popup
      setShowLogoutMessage(true);

      // Vänta 2 sekunder → redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Kunde inte logga ut.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 rounded-3xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <BackButton />
      <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-cyan-600 via-sky-500 to-blue-500 bg-clip-text text-transparent">
        My Profile
      </h1>

      {/* USER INFO */}
      <div className="flex items-center">
        <Avatar className="h-16 w-16 rounded-2xl shadow-lg">
          <AvatarFallback className="rounded-2xl bg-linear-to-br from-cyan-500 via-sky-500 to-blue-500 text-white font-semibold text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="ml-6">
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-8 h-px bg-gray-200 dark:bg-gray-800" />

      {/* DELETE BUTTON (Öppnar dialogen) */}
      <Button
        variant="destructive"
        className="w-full py-5 text-lg flex items-center justify-center gap-2 rounded-2xl"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-5 w-5" />
        Delete Account
      </Button>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Detta kommer logga ut dig från ditt konto.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-4">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="flex-1 rounded-xl"
              onClick={deleteAccount}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* LOGOUT POPUP */}
      {showLogoutMessage && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          Du har loggat ut
        </div>
      )}
    </div>
  );
}
