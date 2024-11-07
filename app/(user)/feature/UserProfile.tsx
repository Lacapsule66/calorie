import { Beef, Flame, Ruler, Trophy, User, Weight, Wheat } from "lucide-react";

export default function UserProfile({
  user,
}: {
  user: {
    id: string;
    email: string;
    name: null;
    profile: null;
  };
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Objectifs Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Objectifs</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-emerald-900/50 flex items-center justify-center">
                <Trophy className="size-6 text-emerald-400" />
              </div>
              <span className="flex-1">Objectif</span>
              <div className="bg-slate-800 rounded-full px-4 py-2">
                Maintenir Le Poids
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-rose-900/50 flex items-center justify-center">
                <User className="size-6 text-rose-400" />
              </div>
              <span className="flex-1">Pas quotidiens</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>10000</span>
                <span className="text-slate-400">pas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Nutrition</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-purple-900/50 flex items-center justify-center">
                <Flame className="size-6 text-purple-400" />
              </div>
              <span className="flex-1">Calories</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>2800</span>
                <span className="text-slate-400">kcal</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-rose-900/50 flex items-center justify-center">
                <div className="size-6 rotate-45 bg-rose-400 rounded-sm" />
              </div>
              <span className="flex-1">Graisses</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>93</span>
                <span className="text-slate-400">g</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-yellow-900/50 flex items-center justify-center">
                <Wheat className="size-6 text-yellow-400" />
              </div>
              <span className="flex-1">Glucides</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>350</span>
                <span className="text-slate-400">g</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-emerald-900/50 flex items-center justify-center">
                <Beef className="size-6 text-emerald-400" />
              </div>
              <span className="flex-1">Protéines</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>140</span>
                <span className="text-slate-400">g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profil Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Profil</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-slate-800 flex items-center justify-center">
                <User className="size-6 text-slate-400" />
              </div>
              <span className="flex-1">Genre</span>
              <div className="bg-slate-800 rounded-full px-4 py-2">Homme</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Ruler className="size-6 text-slate-400" />
              </div>
              <span className="flex-1">Taille</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>172</span>
                <span className="text-slate-400">cm</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Weight className="size-6 text-slate-400" />
              </div>
              <span className="flex-1">Poids</span>
              <div className="bg-slate-800 rounded-full px-4 py-2 flex gap-2">
                <span>75</span>
                <span className="text-slate-400">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
