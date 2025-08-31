package com.ejemplo.agenda.controller;

import com.ejemplo.agenda.model.Categoria;
import com.ejemplo.agenda.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    @GetMapping
    public ResponseEntity<List<Categoria>> obtenerTodasLasCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodasLasCategorias());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        return categoriaService.obtenerCategoriaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Categoria> obtenerCategoriaPorNombre(@PathVariable String nombre) {
        try {
            Categoria categoria = categoriaService.obtenerCategoriaPorNombre(nombre);
            return ResponseEntity.ok(categoria);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@Valid @RequestBody Categoria categoria) {
        try {
            Categoria nuevaCategoria = categoriaService.crearCategoria(categoria);
            return ResponseEntity.ok(nuevaCategoria);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(
            @PathVariable Long id, 
            @Valid @RequestBody Categoria categoria) {
        try {
            Categoria categoriaActualizada = categoriaService.actualizarCategoria(id, categoria);
            return ResponseEntity.ok(categoriaActualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Categoria>> buscarCategorias(@RequestParam String termino) {
        return ResponseEntity.ok(categoriaService.buscarCategoriasPorTermino(termino));
    }
    
    @GetMapping("/existe/{nombre}")
    public ResponseEntity<Boolean> existeCategoriaPorNombre(@PathVariable String nombre) {
        return ResponseEntity.ok(categoriaService.existeCategoriaPorNombre(nombre));
    }
}
