package com.ejemplo.agenda.service.impl;

import com.ejemplo.agenda.model.Categoria;
import com.ejemplo.agenda.model.Contacto;
import com.ejemplo.agenda.model.dto.ContactoRequest;
import com.ejemplo.agenda.model.dto.ContactoResponse;
import com.ejemplo.agenda.repository.CategoriaRepository;
import com.ejemplo.agenda.repository.ContactoRepository;
import com.ejemplo.agenda.service.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactoServiceImpl implements ContactoService {
    
    @Autowired
    private ContactoRepository contactoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Override
    public Page<ContactoResponse> obtenerTodosContactos(int pagina, int tamaño) {
        Pageable pageable = PageRequest.of(pagina, tamaño);
        return contactoRepository.findAll(pageable).map(this::convertirAResponse);
    }
    
    @Override
    public ContactoResponse obtenerContactoPorId(Long id) {
        Contacto contacto = contactoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contacto no encontrado con ID: " + id));
        return convertirAResponse(contacto);
    }
    
    @Override
    public ContactoResponse crearContacto(ContactoRequest contactoRequest) {
        Contacto contacto = convertirAEntity(contactoRequest);
        Contacto contactoGuardado = contactoRepository.save(contacto);
        return convertirAResponse(contactoGuardado);
    }
    
    @Override
    public ContactoResponse actualizarContacto(Long id, ContactoRequest contactoRequest) {
        Contacto contactoExistente = contactoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contacto no encontrado con ID: " + id));
        
        actualizarContactoDesdeRequest(contactoExistente, contactoRequest);
        Contacto contactoActualizado = contactoRepository.save(contactoExistente);
        return convertirAResponse(contactoActualizado);
    }
    
    @Override
    public void eliminarContacto(Long id) {
        if (!contactoRepository.existsById(id)) {
            throw new EntityNotFoundException("Contacto no encontrado con ID: " + id);
        }
        contactoRepository.deleteById(id);
    }
    
    @Override
    public List<ContactoResponse> buscarPorNombre(String nombre) {
        return contactoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactoResponse> buscarPorTermino(String termino) {
        return contactoRepository.buscarPorTermino(termino)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactoResponse> obtenerContactosPorCategoria(String categoria) {
        return contactoRepository.findByCategoriaNombre(categoria)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactoResponse> obtenerContactosFavoritos() {
        return contactoRepository.findByFavorito(true)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public ContactoResponse toggleFavorito(Long id, boolean favorito) {
        Contacto contacto = contactoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contacto no encontrado con ID: " + id));
        
        contacto.setFavorito(favorito);
        Contacto contactoActualizado = contactoRepository.save(contacto);
        return convertirAResponse(contactoActualizado);
    }
    
    // Métodos privados de conversión
    private ContactoResponse convertirAResponse(Contacto contacto) {
        ContactoResponse response = new ContactoResponse();
        response.setId(contacto.getId());
        response.setNombre(contacto.getNombre());
        response.setApellido(contacto.getApellido());
        response.setTelefono(contacto.getTelefono());
        response.setEmail(contacto.getEmail());
        response.setDireccion(contacto.getDireccion());
        response.setFechaNacimiento(contacto.getFechaNacimiento());
        response.setNotas(contacto.getNotas());
        response.setFavorito(contacto.isFavorito());
        response.setCategoria(contacto.getCategoria() != null ? contacto.getCategoria().getNombre() : null);
        response.setFechaCreacion(contacto.getFechaCreacion());
        response.setFechaActualizacion(contacto.getFechaActualizacion());
        return response;
    }
    
    private Contacto convertirAEntity(ContactoRequest request) {
        Contacto contacto = new Contacto();
        contacto.setNombre(request.getNombre());
        contacto.setApellido(request.getApellido());
        contacto.setTelefono(request.getTelefono());
        contacto.setEmail(request.getEmail());
        contacto.setDireccion(request.getDireccion());
        contacto.setFechaNacimiento(request.getFechaNacimiento());
        contacto.setNotas(request.getNotas());
        contacto.setFavorito(request.isFavorito());
        
        // Asignar categoría si se proporciona
        if (request.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + request.getCategoriaId()));
            contacto.setCategoria(categoria);
        }
        
        return contacto;
    }
    
    private void actualizarContactoDesdeRequest(Contacto contacto, ContactoRequest request) {
        if (request.getNombre() != null) {
            contacto.setNombre(request.getNombre());
        }
        if (request.getApellido() != null) {
            contacto.setApellido(request.getApellido());
        }
        if (request.getTelefono() != null) {
            contacto.setTelefono(request.getTelefono());
        }
        if (request.getEmail() != null) {
            contacto.setEmail(request.getEmail());
        }
        if (request.getDireccion() != null) {
            contacto.setDireccion(request.getDireccion());
        }
        if (request.getFechaNacimiento() != null) {
            contacto.setFechaNacimiento(request.getFechaNacimiento());
        }
        if (request.getNotas() != null) {
            contacto.setNotas(request.getNotas());
        }
        contacto.setFavorito(request.isFavorito());
        
        // Actualizar categoría si se proporciona
        if (request.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + request.getCategoriaId()));
            contacto.setCategoria(categoria);
        }
    }
}