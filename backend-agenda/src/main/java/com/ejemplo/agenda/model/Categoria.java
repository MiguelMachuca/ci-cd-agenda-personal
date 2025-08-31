package com.ejemplo.agenda.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
@JsonIgnoreProperties({"contactos"})
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    @Column(nullable = false, unique = true)
    private String nombre;
    
    @Size(max = 7, message = "El color debe ser un código hexadecimal válido")
    private String color;
    
    @Size(max = 200, message = "La descripción no puede exceder 200 caracteres")
    private String descripcion;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contacto> contactos = new ArrayList<>();
    
    // Constructores
    public Categoria() {}
    
    public Categoria(String nombre) {
        this.nombre = nombre;
    }
    
    public Categoria(String nombre, String color, String descripcion) {
        this.nombre = nombre;
        this.color = color;
        this.descripcion = descripcion;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public List<Contacto> getContactos() {
        return contactos;
    }
    
    public void setContactos(List<Contacto> contactos) {
        this.contactos = contactos;
    }
    
    // Métodos de utilidad
    public void agregarContacto(Contacto contacto) {
        contactos.add(contacto);
        contacto.setCategoria(this);
    }
    
    public void removerContacto(Contacto contacto) {
        contactos.remove(contacto);
        contacto.setCategoria(null);
    }
    
    public int getCantidadContactos() {
        return contactos.size();
    }
    
    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", color='" + color + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", cantidadContactos=" + getCantidadContactos() +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Categoria categoria = (Categoria) o;
        return id != null && id.equals(categoria.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}