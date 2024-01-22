export function formatLink(driveLink: string): string {
    const match = driveLink.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else {
        // Gérer le cas où le format du lien n'est pas correct
        console.error("Format de lien non valide");
        return ""; // ou retourner une valeur par défaut ou lever une erreur
    }
}
