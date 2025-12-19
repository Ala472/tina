<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection; // Importez les classes d'opérations
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Controller\ProductController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    // ➡️ SUPPRIMER la ligne security: "is_granted('ROLE_ADMIN')" globale ici.
    operations: [
        // 1. GET Collection (/api/products) : Accessible à tous les utilisateurs connectés
        new GetCollection(security: "is_granted('PUBLIC_ACCESS')"),
        
        // 2. POST (Création) : Réservé aux Administrateurs
        //new Post(security: "is_granted('ROLE_ADMIN')",),
        new Post(
            security: "is_granted('ROLE_ADMIN')",
            uriTemplate: '/products/{id}',
            controller: ProductController::class,
            deserialize: false,
            name: 'product_update_multipart'
        ),
        // 3. GET Item (/api/products/{id}) : Accessible à tous les utilisateurs connectés
        new Get(security: "is_granted('PUBLIC_ACCESS')"),
        
        // 4. PUT/DELETE : Réservé aux Administrateurs
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:write']]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write'])]
    private ?string $title = null;

    #[ORM\Column]
    #[Groups(['product:read', 'product:write'])]
    private ?float $price = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write'])]
    private ?string $features = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write'])]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(['product:read', 'product:write'])]
    private ?int $notice = null;

    #[ORM\ManyToOne(targetEntity: Categorie::class, inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read', 'product:write'])]
    #[ApiProperty]
    private ?Categorie $categorie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getFeatures(): ?string
    {
        return $this->features;
    }

    public function setFeatures(string $features): static
    {
        $this->features = $features;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getNotice(): ?int
    {
        return $this->notice;
    }

    public function setNotice(int $notice): static
    {
        $this->notice = $notice;

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }
}
