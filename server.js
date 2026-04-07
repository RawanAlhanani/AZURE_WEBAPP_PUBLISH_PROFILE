function writeCounter(count) {
  try {
    fs.writeFileSync(FILE, JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error("Erreur écriture JSON:", err);
  }
}

// Route principale
app.get("/", async (req, res) => {
  while (lock) await new Promise(r => setTimeout(r, 10));
  lock = true;
  try {
    let count = readCounter();
    count++;
    writeCounter(count);
    
    // Affiche le compteur
    res.send(`Nombre de visites : ${count}`);
  } finally {
    lock = false;
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});