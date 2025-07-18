package com.pies.soap.repository;

import com.pies.soap.model.SoapNote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SoapNoteRepository extends JpaRepository<SoapNote, Long> {
    Page<SoapNote> findByActiveStatusTrue(Pageable pageable);

    @Query("select s from SoapNote s where s.activeStatus=true" +
            " and (:q is null or lower(s.patient.firstName) like lower(concat('%', :q, '%'))" +
            " or lower(s.patient.lastName) like lower(concat('%', :q, '%'))) ")
    Page<SoapNote> search(@Param("q") String q, Pageable pageable);
}