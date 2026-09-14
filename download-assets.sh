#!/usr/bin/env bash
# Télécharge les photos du site dans assets/img/photos/
# À lancer depuis la racine du projet : bash download-assets.sh
set -euo pipefail
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_30l04nmCFPVxWFiigwWOAtRGAtC"
DIR="assets/img/photos"
mkdir -p "$DIR"

declare -A IMG=(
  [hero]="hf_20260914_111307_7e07cc12-54d3-4e02-a6df-abff505d7205.png"
  [construction]="hf_20260914_111307_567fb899-2f92-40a9-840f-721a2737169d.png"
  [logistique]="hf_20260914_111306_46f2ee02-3461-4b48-bc27-80a9d1785088.png"
  [frigo]="hf_20260914_111307_f0f43e96-3b76-47b7-9a60-c78d41f03d4d.png"
  [entrepot]="hf_20260914_111306_fa7984ac-1a23-4e1d-b04a-bda2f7a30f24.png"
  [projet-immeuble]="hf_20260914_111307_76f597a1-5c42-4328-8568-09ff38e2bee3.png"
  [projet-terrassement]="hf_20260914_111307_bedcdac3-7086-46c0-a75e-4b75546eeecf.png"
  [projet-materiaux]="hf_20260914_111307_4e8f4840-adca-4cb1-b230-7978cc58dbd0.png"
  [equipe]="hf_20260914_111306_a11ab6ff-2472-4eaa-a999-bc07e6fe52a6.png"
)
for name in "${!IMG[@]}"; do
  echo "→ $name.png"
  curl -fSL "$BASE/${IMG[$name]}" -o "$DIR/$name.png"
done
echo "✓ Toutes les photos sont dans $DIR/"
