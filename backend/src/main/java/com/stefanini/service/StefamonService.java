package com.stefanini.service;

import com.stefanini.dto.paginacao.Page;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Stefamon;
import com.stefanini.exceptions.stefamon.StefamonNaoEncontradoException;
import com.stefanini.parser.StefamonParser;
import com.stefanini.repository.StefamonRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class StefamonService {

    @Inject
    StefamonRepository repository;

    public List<StefamonDTO> listarTodos(){
        return repository.listAll().stream()
                .map(StefamonParser::EntityToDto)
                .collect(Collectors.toList());

    }

    public Page<StefamonDTO> listarTodosPaginado(int numPagina, int tamanhoPagina, String ordem, String coluna, String nome){
        Page<Stefamon> stefamonPage = repository.buscarTodosPaginadoEOrdenado(numPagina, tamanhoPagina, ordem, coluna, nome);

        return new Page<>(
                stefamonPage.getElementos().stream().map(StefamonParser::EntityToDto).collect(Collectors.toList()),
                stefamonPage.getTotalElementos()
        );
    }


    public StefamonDTO buscarPorId(Long id) {
        var stefamon =  repository.findById(id);
        if(Objects.isNull(stefamon)) {
            throw new StefamonNaoEncontradoException("Stefamon de id " + id + " não foi encontrado.");
        }
        return StefamonParser.EntityToDto(stefamon);
    }

 }
