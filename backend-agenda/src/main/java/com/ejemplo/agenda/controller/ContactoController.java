package com.ejemplo.agenda.controller;

import com.ejemplo.agenda.model.dto.ContactoRequest;
import com.ejemplo.agenda.model.dto.ContactoResponse;
import com.ejemplo.agenda.service.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/contactos")
@CrossOrigin(origins = "*")
public class ContactoController {
    
    @Autowired
    private ContactoService contactoService;
    
    @GetMapping
    public ResponseEntity<Page<ContactoResponse>> obtenerTodosContactos(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamaño) {
        return ResponseEntity.ok(contactoService.obtenerTodosContactos(pagina, tamaño));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ContactoResponse> obtenerContactoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(contactoService.obtenerContactoPorId(id));
    }
    
    @PostMapping
    public ResponseEntity<ContactoResponse> crearContacto(@Valid @RequestBody ContactoRequest contactoRequest) {
        return ResponseEntity.ok(contactoService.crearContacto(contactoRequest));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ContactoResponse> actualizarContacto(
            @PathVariable Long id, 
            @Valid @RequestBody ContactoRequest contactoRequest) {
        return ResponseEntity.ok(contactoService.actualizarContacto(id, contactoRequest));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarContacto(@PathVariable Long id) {
        contactoService.eliminarContacto(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<ContactoResponse>> buscarContactos(@RequestParam String termino) {
        return ResponseEntity.ok(contactoService.buscarPorTermino(termino));
    }
    
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ContactoResponse>> obtenerContactosPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(contactoService.obtenerContactosPorCategoria(categoria));
    }
    
    @GetMapping("/favoritos")
    public ResponseEntity<List<ContactoResponse>> obtenerContactosFavoritos() {
        return ResponseEntity.ok(contactoService.obtenerContactosFavoritos());
    }
    
    @PatchMapping("/{id}/favorito")
    public ResponseEntity<ContactoResponse> toggleFavorito(
            @PathVariable Long id, 
            @RequestBody Map<String, Boolean> request) {
        Boolean favorito = request.get("favorito");
        return ResponseEntity.ok(contactoService.toggleFavorito(id, favorito));
    }
    
    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        try {
            Map<String, Object> estadisticas = new HashMap<>();
            
            // Obtener estadísticas básicas
            List<ContactoResponse> todosContactos = contactoService.obtenerTodosContactos(0, Integer.MAX_VALUE).getContent();
            List<ContactoResponse> favoritos = contactoService.obtenerContactosFavoritos();
            
            estadisticas.put("totalContactos", todosContactos.size());
            estadisticas.put("totalFavoritos", favoritos.size());
            estadisticas.put("contactosConEmail", todosContactos.stream().filter(c -> c.getEmail() != null && !c.getEmail().isEmpty()).count());
            estadisticas.put("contactosConTelefono", todosContactos.stream().filter(c -> c.getTelefono() != null && !c.getTelefono().isEmpty()).count());
            
            // Estadísticas por categoría
            Map<String, Long> porCategoria = todosContactos.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    c -> c.getCategoria() != null ? c.getCategoria() : "Sin categoría",
                    java.util.stream.Collectors.counting()
                ));
            estadisticas.put("porCategoria", porCategoria);
            
            // Contactos recientes (últimos 5)
            List<ContactoResponse> recientes = todosContactos.stream()
                .sorted((c1, c2) -> c2.getFechaCreacion().compareTo(c1.getFechaCreacion()))
                .limit(5)
                .collect(java.util.stream.Collectors.toList());
            estadisticas.put("contactosRecientes", recientes);
            
            return ResponseEntity.ok(estadisticas);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener estadísticas: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}