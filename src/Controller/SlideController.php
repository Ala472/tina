<?php

// src/Controller/Api/SlideController.php
namespace App\Controller;

use App\Entity\Slide;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/slides')]
class SlideController extends AbstractController
{
    #[Route('', methods:['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): Response {
        $slides = $em->getRepository(Slide::class)->findAll();
        return $this->json($slides);
    }

    #[Route('/{id}', methods:['GET'])]
    public function show(Slide $slide): Response {
        return $this->json($slide);
    }

    #[Route('', methods:['POST'])]
    public function create(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response {
        $data = json_decode($request->getContent(), true);
        $slide = new Slide();
        $slide->setTitle($data['title']);
        $slide->setDescription($data['description']);
        $slide->setImageUrl($data['imageUrl']);
        $em->persist($slide);
        $em->flush();
        return $this->json($slide);
    }

    #[Route('/{id}', methods:['PUT'])]
    public function update(Request $request, Slide $slide, EntityManagerInterface $em): Response {
        $data = json_decode($request->getContent(), true);
        $slide->setTitle($data['title']);
        $slide->setDescription($data['description']);
        $slide->setImageUrl($data['imageUrl']);
        $em->flush();
        return $this->json($slide);
    }

    #[Route('/{id}', methods:['DELETE'])]
    public function delete(Slide $slide, EntityManagerInterface $em): Response {
        $em->remove($slide);
        $em->flush();
        return $this->json(['message' => 'Slide deleted']);
    }
}
